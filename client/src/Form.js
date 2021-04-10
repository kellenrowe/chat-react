import React, { useState } from "react";
import "./Form.css";

/** Form Component
 *
 *  Props:
 *    - sendMsg: fn passed down from parent
 *    - notifyTyping: fn passed down from parent
 *
 *  State:
 *    - formData:
 *        object like {
 *           handle: 'users handle',
 *           msg: 'message here',
 *        }
 *
 *  App -> ChatRoom -> Form
 */
function Form({ sendMsg, notifyTyping, removeTyping }) {
  const [formData, setFormData] = useState({ handle: "", msg: "" });

  function handleChange(evt) {
    // handles formData update while typing
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
    // handles typing notification
    if (formData.msg.length > 1) {
      notifyTyping(formData.handle);
    } else {
      removeTyping();
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    sendMsg(formData);
    setFormData((fData) => ({
      ...fData,
      msg: "",
    }));
  }

  return (
    <form className="col-10 mx-auto" onSubmit={handleSubmit}>
      <div className="formField">
        <input
          onChange={handleChange}
          required
          name="handle"
          value={formData.handle}
          className="Form-input col-12"
        />
        <label className="Form-formLabel col-12 text-left">Handle</label>
      </div>
      <div className="formField">
        <input
          onChange={handleChange}
          required
          name="msg"
          id="msgInput"
          value={formData.msg}
          className="Form-input col-12"
        />
        <label className="Form-formLabel col-12 text-left">Message</label>
      </div>
      <button type="submit" className="col-12 sendBtn">
        Send
      </button>
    </form>
  );
}

export default Form;
