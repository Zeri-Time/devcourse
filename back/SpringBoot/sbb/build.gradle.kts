import org.gradle.kotlin.dsl.runtimeOnly

plugins {
    java
    id("org.springframework.boot") version "3.5.0"
    id("io.spring.dependency-management") version "1.1.7"
}

group = "com.mysite"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    // --- 애플리케이션 실행 핵심 의존성 ---
    implementation("org.springframework.boot:spring-boot-starter-web")
    //  - Spring MVC, 내장 Tomcat, Jackson(JSON 직렬화), Validation 포함

    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    //  - Spring Data JPA + Hibernate (엔티티 매핑, Repository 지원)

    runtimeOnly("com.h2database:h2")
    //  - 개발/테스트용 인메모리(or 파일) H2 데이터베이스

    // --- 개발 편의 ---
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    //  - 자동 재시작, LiveReload (운영 배포 제외)

    // --- Lombok (컴파일 시에만 필요) ---
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")
    //  - Getter/Setter/Builder 등 보일러플레이트 제거

    // --- 테스트 ---
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    //  - JUnit 5, Mockito, AssertJ, Spring Test, JSONassert 등 포함

    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    //  - 일부 IDE/툴에서 플랫폼 런처 필요 시 사용
}

tasks.withType<Test> {
    useJUnitPlatform()
}