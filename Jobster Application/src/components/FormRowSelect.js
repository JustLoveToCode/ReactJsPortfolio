const FormRowSelect = ({labelText,name,value, handleChange,list})=>{
    return(
        <div className="form-row">
        <label htmlFor={name} className="form-label">
            {labelText || name}
        </label>
        
        <select name={name} id={name}
                value={value}
                onChange={handleChange}
                className="form-select"
        >
        {/* Using the map method since list is in the 
        format of an array */}
        {list.map((itemValue, index)=>{
        // This is the return statement:
        return(
            <option key={index} value={itemValue}>
            {itemValue}
            </option>
            );
        })}
        </select>
        </div>
    )
}

export default FormRowSelect