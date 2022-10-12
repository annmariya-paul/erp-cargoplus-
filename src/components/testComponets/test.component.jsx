function TestComponent({ versions }) {
  return (
    <div>
      {versions.includes("v1", "v2") && <input />}
      {versions.includes("v3") && <button>Button</button>}
    </div>
  );
}

export default TestComponent;
