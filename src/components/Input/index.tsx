import { Field, ErrorMessage } from 'formik';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  title: string;
}

export const Input = ({ title, ...props }: InputProps) => {
  return (
    <>
      <label htmlFor={props.name}>{title}</label>
      <Field name={props.name} placeholder={props.placeholder} type={props.type} />
      <ErrorMessage name={props.name || ''}>
        {(msg) => <div className="error">{msg}</div>}
      </ErrorMessage>
    </>
  );
};
