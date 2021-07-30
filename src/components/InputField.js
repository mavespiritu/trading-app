const InputField = ({
    className,
    type,
    label,
    name,
    value,
    onChange,
    invalid = false,
    invalidMessage = ""
  }) => {
  
    let inputClasses = "h-10 py-2 px-4 block w-full shadow sm:text-sm border-indigo-500 rounded my-2"
    if (invalid) {
      inputClasses += " border-red-500 border-2"
    }
  
    return (
      <div className={className}>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
          placeholder={name}
          />
          { invalid &&
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {invalidMessage}
              </span>
          }         
      </div>
    )
  
  }
  
  export default InputField