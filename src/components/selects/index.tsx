import React from 'react';
import Select from 'react-select';

const Select2 = ({
  styles,
  className,
  defaultValue,
  onChange,
  options,
  getOptionLabel,
  getOptionValue,
  onInputChange,
  isMulti,
  transformer,
  placeholder,
  isClearable = false
}: any) => {
  const data =
    options &&
    options.map((item: any) => {
      return transformer(item);
    });
  
  const colourStyles = {
    input: (base:any) => ({
    ...base,
    color: "#fff"
    }),
    control: (styles: any) => ({ ...styles, backgroundColor: '#3b3b3b', color: '#fff', border: 'none' }),
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        backgroundColor: '#3b3b3b',
        color: '#FFF',
        cursor: isDisabled ? 'not-allowed' : 'default'
      };
    },
    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        fontSize: '12px',
        color: '#ffffff'
      };
    },
    singleValue: (provided: any, state: any) => {
      return { ...provided, color: '#fff' };
    },
  };
  
  return (
    <Select
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      className={className}
      placeholder={placeholder}
      styles={colourStyles}
      onInputChange={onInputChange}
      isClearable={isClearable}
      options={data}
      defaultValue={defaultValue}
      onChange={onChange}
      isMulti={isMulti}
      isRtl
    />
  );
};

export default Select2;