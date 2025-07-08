import { useNameList } from '../hooks/useNameList'

function NameList4({ initialNames }) {
  const {
    name,
    input,
    editingId,
    editText,
    setEditText,
    handleInput,
    handleClick,
    handleEnter,
    handleDelete,
    handleEdit,
    handleSave,
    handleCancel,
  } = useNameList(initialNames)
  return (
    <>
      <input
        type="text"
        className="border border-white"
        value={input}
        onChange={handleInput}
        onKeyDown={handleEnter}
      />
      <button onClick={handleClick}>입력</button>
      <ul>
        {name.map((item) => (
          <li key={item.id}>
            {editingId === item.id ? (
              // 수정 모드 UI
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSave(item.id)}>저장</button>
                <button onClick={handleCancel}>취소</button>
              </>
            ) : (
              // 일반 모드 UI
              <>
                {item.id} : {item.value}
                <button onClick={() => handleEdit(item.id, item.value)}>
                  수정
                </button>
                <button onClick={() => handleDelete(item.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
export default NameList4
