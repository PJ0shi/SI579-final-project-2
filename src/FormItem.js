const FormItem = ({label, stateName, inputHandler,formData, type}) => {
    return (<div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        value={formData[stateName]}
        onInput={(e) => inputHandler(e, stateName)}
      />
    </div>)

}
export default FormItem;

// should output this markup
//.  <div className="mb-3">
//       <label className="form-label">FORM LABEL</label>
//       <input
//         type=TYPE OF INTPUT
//         class="form-control"
//       />
//     </div>