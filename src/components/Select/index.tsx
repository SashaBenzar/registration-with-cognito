interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
  array: string[];
}

export const Select = ({ title, array, ...props }: SelectProps) => {
  return (
    <>
      <label htmlFor={props.name}>{title}</label>
      <select {...props}>
        {array.map((state) => (
          <option value={state} key={state}>
            {state}
          </option>
        ))}
      </select>
    </>
  );
};
