import { Select } from 'antd';
import { Raw } from 'types';

type SelectProps = React.ComponentProps<typeof Select>; // 获取到Select组件的props定义

interface IdSelectProps
  extends Omit<SelectProps, 'options' | 'value' | 'onChange'> {
  value: Raw | undefined | null;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: {
    name: string;
    id: number;
  }[];
}

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName && (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      )}
      {options?.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
