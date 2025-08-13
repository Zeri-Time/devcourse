package com.ll.jsp.board.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 데이터베이스 연결 및 SQL 실행을 담당하는 클래스
 * MySQL 데이터베이스와의 연결을 관리하고, CRUD 작업을 수행하는 메서드들을 제공
 */
public class DBConnection {

    // === 데이터베이스 연결 관련 멤버 변수 ===

    /** 실제 DB 연결 객체 */
    private Connection connection;

    /** 데이터베이스 이름 */
    public static String DB_NAME = "board_project";

    /** DB 접속 사용자명 */
    public static String DB_USER = "root";

    /** DB 접속 비밀번호 */
    public static String DB_PASSWORD = "1234";

    /** DB 접속 포트번호 (MySQL 기본 포트) */
    public static int DB_PORT = 3306;

    /**
     * MySQL 데이터베이스에 연결하는 메서드
     * JDBC 드라이버를 로드하고 데이터베이스 연결을 수립
     */
    public void connect() {
        // 데이터베이스 연결 URL 구성
        // serverTimezone: 시간대 설정 (한국 시간)
        // useOldAliasMetadataBehavior: MySQL 호환성을 위한 설정
        String url = "jdbc:mysql://localhost:" + DB_PORT + "/" + DB_NAME
                + "?serverTimezone=Asia/Seoul&useOldAliasMetadataBehavior=true";
        String user = DB_USER;
        String password = DB_PASSWORD;

        // MySQL JDBC 드라이버 클래스명
        String driverName = "com.mysql.cj.jdbc.Driver";

        try {
            // 1. MySQL JDBC 드라이버를 메모리에 로드
            Class.forName(driverName);

            // 2. 데이터베이스에 실제 연결 수립
            connection = DriverManager.getConnection(url, user, password);
            System.out.println("연결성공");
        } catch (SQLException e) {
            // SQL 관련 예외 (연결 실패, 잘못된 계정 정보 등)
            System.err.printf("[SQL 예외] : %s\n", e.getMessage());
        } catch (ClassNotFoundException e) {
            // JDBC 드라이버 클래스를 찾을 수 없을 때 발생
            System.err.printf("[드라이버 클래스 로딩 예외] : %s\n", e.getMessage());
        }
    }

    /**
     * SQL 실행 결과에서 단일 정수값을 반환하는 메서드
     * 주로 COUNT(*), MAX(id) 같은 집계 함수 결과를 가져올 때 사용
     *
     * @param sql 실행할 SQL 쿼리문
     * @return 조회된 정수값, 결과가 없으면 -1
     */
    public int selectRowIntValue(String sql) {
        // 단일 행 데이터를 Map으로 가져옴
        Map<String, Object> row = selectRow(sql);

        // Map의 첫 번째 값을 정수로 변환하여 반환
        for (String key : row.keySet()) {
            return (int) row.get(key);
        }

        return -1; // 결과가 없을 때 기본값
    }

    /**
     * SQL 실행 결과에서 단일 문자열값을 반환하는 메서드
     * 주로 단일 컬럼의 문자열 값을 가져올 때 사용
     *
     * @param sql 실행할 SQL 쿼리문
     * @return 조회된 문자열값, 결과가 없으면 빈 문자열
     */
    public String selectRowStringValue(String sql) {
        Map<String, Object> row = selectRow(sql);

        // Map의 첫 번째 값을 문자열로 변환하여 반환
        for (String key : row.keySet()) {
            return (String) row.get(key);
        }

        return ""; // 결과가 없을 때 기본값
    }

    /**
     * SQL 실행 결과에서 단일 불린값을 반환하는 메서드
     * 데이터베이스의 다양한 타입(문자열 "1", 정수 1, boolean)을
     * 불린값으로 변환하여 반환
     *
     * @param sql 실행할 SQL 쿼리문
     * @return 변환된 불린값, 결과가 없으면 false
     */
    public Boolean selectRowBooleanValue(String sql) {
        Map<String, Object> row = selectRow(sql);

        for (String key : row.keySet()) {
            Object value = row.get(key);

            // 값의 타입에 따라 다르게 처리
            if (value instanceof String) {
                // 문자열 "1"이면 true, 그 외는 false
                return ((String) value).equals("1");
            } else if (value instanceof Integer) {
                // 정수 1이면 true, 그 외는 false
                return ((int) value) == 1;
            } else if (value instanceof Boolean) {
                // 이미 불린값이면 그대로 반환
                return ((boolean) value);
            }
        }

        return false; // 결과가 없을 때 기본값
    }

    /**
     * SQL 실행 결과에서 단일 행을 Map으로 반환하는 메서드
     * 여러 컬럼을 가진 한 행의 데이터를 가져올 때 사용
     *
     * @param sql 실행할 SQL 쿼리문
     * @return 컬럼명을 키로 하고 값을 밸류로 하는 Map, 결과가 없으면 빈 Map
     */
    public Map<String, Object> selectRow(String sql) {
        // 모든 행을 가져온 후 첫 번째 행만 반환
        List<Map<String, Object>> rows = selectRows(sql);

        if (rows.size() == 0) {
            return new HashMap<String, Object>(); // 결과가 없으면 빈 Map
        }

        return rows.get(0); // 첫 번째 행 반환
    }

    /**
     * SQL 실행 결과에서 여러 행을 List<Map>으로 반환하는 메서드
     * 이 클래스의 핵심 메서드로, 모든 SELECT 작업의 기반이 됨
     *
     * @param sql 실행할 SQL 쿼리문
     * @return 각 행을 Map으로 담은 List, 결과가 없으면 빈 List
     */
    public List<Map<String, Object>> selectRows(String sql) {
        List<Map<String, Object>> rows = new ArrayList<>();

        try {
            // SQL 실행을 위한 Statement 생성
            Statement stmt = connection.createStatement();

            // SELECT 쿼리 실행 및 결과 집합 획득
            ResultSet rs = stmt.executeQuery(sql);

            // 결과 집합의 메타데이터 (컬럼 정보) 획득
            ResultSetMetaData metaData = rs.getMetaData();
            int columnSize = metaData.getColumnCount(); // 컬럼 개수

            // 결과 집합의 각 행을 순회
            while (rs.next()) {
                Map<String, Object> row = new HashMap<>(); // 한 행을 담을 Map

                // 각 컬럼의 값을 Map에 저장
                for (int columnIndex = 0; columnIndex < columnSize; columnIndex++) {
                    // 컬럼명 획득 (인덱스는 1부터 시작)
                    String columnName = metaData.getColumnName(columnIndex + 1);
                    // 컬럼값 획득
                    Object value = rs.getObject(columnName);

                    // 데이터 타입별 특별 처리
                    if (value instanceof Long) {
                        // Long을 int로 변환 (일관성을 위해)
                        int numValue = (int) (long) value;
                        row.put(columnName, numValue);
                    } else if (value instanceof Timestamp) {
                        // Timestamp를 문자열로 변환 (마지막 2자리 제거)
                        String dateValue = value.toString();
                        dateValue = dateValue.substring(0, dateValue.length() - 2);
                        row.put(columnName, dateValue);
                    } else {
                        // 그 외의 타입은 그대로 저장
                        row.put(columnName, value);
                    }
                }

                rows.add(row); // 완성된 행을 리스트에 추가
            }
        } catch (SQLException e) {
            System.err.printf("[SQL 예외, SQL : %s] : %s\n", sql, e.getMessage());
            e.printStackTrace();
        }

        return rows;
    }

    /**
     * DELETE SQL을 실행하는 메서드
     *
     * @param sql 실행할 DELETE 쿼리문
     * @return 삭제된 행의 개수, 실패시 0
     */
    public int delete(String sql) {
        int affectedRows = 0; // 영향받은 행의 수

        Statement stmt;
        try {
            stmt = connection.createStatement();
            // executeUpdate: INSERT, UPDATE, DELETE용 메서드
            affectedRows = stmt.executeUpdate(sql);
        } catch (SQLException e) {
            System.err.printf("[SQL 예외, SQL : %s] : %s\n", sql, e.getMessage());
        }

        return affectedRows; // 삭제된 행의 개수 반환
    }

    /**
     * UPDATE SQL을 실행하는 메서드
     *
     * @param sql 실행할 UPDATE 쿼리문
     * @return 수정된 행의 개수, 실패시 0
     */
    public int update(String sql) {
        int affectedRows = 0; // 영향받은 행의 수

        Statement stmt;
        try {
            stmt = connection.createStatement();
            // executeUpdate: INSERT, UPDATE, DELETE용 메서드
            affectedRows = stmt.executeUpdate(sql);
        } catch (SQLException e) {
            System.err.printf("[SQL 예외, SQL : %s] : %s\n", sql, e.getMessage());
        }

        return affectedRows; // 수정된 행의 개수 반환
    }

    /**
     * INSERT SQL을 실행하고 생성된 기본키(ID)를 반환하는 메서드
     * AUTO_INCREMENT 컬럼의 값을 자동으로 반환받음
     *
     * @param sql 실행할 INSERT 쿼리문
     * @return 생성된 기본키(ID), 실패시 -1
     */
    public int insert(String sql) {
        int id = -1; // 생성된 ID

        try {
            Statement stmt = connection.createStatement();

            // INSERT 실행하면서 생성된 키를 반환받도록 설정
            stmt.execute(sql, Statement.RETURN_GENERATED_KEYS);

            // 생성된 키들을 가져옴
            ResultSet rs = stmt.getGeneratedKeys();

            // 생성된 키가 있으면 첫 번째 키(보통 ID)를 반환
            if (rs.next()) {
                id = rs.getInt(1);
            }

        } catch (SQLException e) {
            System.err.printf("[SQL 예외, SQL : %s] : %s\n", sql, e.getMessage());
        }

        return id; // 생성된 ID 반환
    }

    /**
     * 데이터베이스 연결을 종료하는 메서드
     * 애플리케이션 종료 시 반드시 호출하여 리소스를 정리해야 함
     */
    public void close() {
        if (connection != null) {
            try {
                connection.close();
                System.out.println("데이터베이스 연결 종료");
            } catch (SQLException e) {
                System.err.printf("[SQL 예외] : %s\n", e.getMessage());
            }
        }
    }
}