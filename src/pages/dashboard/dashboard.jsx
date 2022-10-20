import React from "react";

export default function Dashboard(){

    return (
      <>
        <h2>Dashboard</h2>

      </>
    );
}

// import React, { useState } from "react";

// import { Form, InputGroup, Button } from "react-bootstrap";

// function App() {
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [leadName, setLeadName] = useState("");

//   const handleSubmit = (event) => {
//     const form = event.currentTarget;
//     event.preventDefault();
//     event.stopPropagation();

//     setFormSubmitted(true);
//   };

//   return (
//     <div className="App">
//       <Form noValidate id="bidForm" onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="leadname">
//           <Form.Label>Bid Amount</Form.Label>

//           <Form.Control
//             required
//             value={leadName}
//             isInvalid={
//               !leadName.length > 0 && (leadName.length || formSubmitted)
//             }
//             onChange={(e) => setLeadName(e.target.value)}
//           />
//           <Form.Control.Feedback type="invalid">
//             name is not registered
//           </Form.Control.Feedback>
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default App;
