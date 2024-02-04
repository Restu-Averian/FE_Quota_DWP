import { Form } from "antd";
import { useMemo } from "react";

/**
 *
 * @param {import("antd").FormItemProps & import("./types").BaseFieldProps} props
 * @returns
 */
const FormItem = ({ children, label, name, required, ...props }) => {
  const rulesRequired = useMemo(() => {
    if (required) {
      const isRulesExist =
        props?.rules?.length > 0 && typeof props?.rules !== "undefined";

      return [
        isRulesExist
          ? {
              ...props.rules,
            }
          : {},
        {
          required: true,
          message: `${name} is Required`,
        },
      ];
    }
    return props.rules;
  }, [required]);

  console.log(rulesRequired);
  return (
    <Form.Item label={label} name={name} rules={rulesRequired} {...props}>
      {children}
    </Form.Item>
  );
};
export default FormItem;
