
const ErrorShow = ({ messages }) => {
  console.log(messages)
  return (
    <div className="error-container">
    {messages.map((message, index) => (
      <div key={index} className="error">
        {message}
      </div>
    ))}
  </div>
  )
}

export default ErrorShow