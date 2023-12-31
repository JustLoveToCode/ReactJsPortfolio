
const FormRow=({type, name, value, handleChange, labelText})=>{
    return(
        <div className="form-row">
        {/* Name for the Label */}
        {/* name and id must matched for both to connect with each other */}
        <label htmlFor={name} className="form-label">
        {/* Using the Ternary Or Operator to check if the labelText Actually Exist */}
        {labelText || name}
        </label>
        {/* values here is the Initial useState Hook */}
        {/* It is used to correspond to the name in the input element */}
        {/* value refer to the Dynamic value shown on the Screen */}
        {/* type can be the type of field, like text */}
        {/* name attribute is the Key itself */}
        {/* value attribute is the value pairing with the Key */}
        <input id={name} type={type} name={name} value={value}
        onChange={handleChange} className="form-input" />


    </div>
    
    )
}

export default FormRow;