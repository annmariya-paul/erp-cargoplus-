export default function ErrorMsg({ code }) {
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
          <span>Sorry an Error Occured Error Code: {code}</span>
        </div>
      </div>
    </>
  );
}
