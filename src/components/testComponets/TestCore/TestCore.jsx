function TestCore({ children, inputOneChange, inpuTwoChange }) {
  return (
    <div>
      <div>
        <label htmlFor="">Core Input 1</label>
        <input onChange={inputOneChange} type="text" />
      </div>
      <div>
        <label htmlFor="">Core Input 2</label>
        <input type="text" />
      </div>
      {children}
    </div>
  );
}

export default TestCore;
