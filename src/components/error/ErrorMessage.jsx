export default function ErrorMsg({ code, messages }) {
  return (
    <>
      <div className="row mt-4">
        <div
          class="alert alert-danger container-fluid"
          role="alert"
          style={{ fontSize: "15px", textAlign: "center" }}
        >
          <i
            class="bi bi-exclamation-circle-fill"
            style={{ paddingRight: "6px" }}
          />
          <span>
            {messages}: {code}
          </span>
        </div>
      </div>
    </>
  );
}
