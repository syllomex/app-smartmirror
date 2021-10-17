import React, { useState } from 'react';
import { Switch as SwitchComponent, SwitchProps } from 'react-native';

import { colors } from '../../assets/colors';

type Props = Omit<SwitchProps, 'onValueChange'> & {
  defaultValue?: boolean;
  onValueChange?: (value: boolean) => boolean | Promise<boolean>;
};

const Switch: React.FC<Props> = ({ defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue || false);

  return (
    <SwitchComponent
      {...props}
      onValueChange={(_value) => {
        (async () => {
          const prevent = props.onValueChange
            ? await props.onValueChange(_value)
            : false;

          if (!prevent) setValue(_value);
        })();
      }}
      value={value}
      thumbColor={colors.light_2}
      trackColor={{
        false: colors.light_1_transparent,
        true: colors.text_light_1,
      }}
    />
  );
};

Switch.defaultProps = {
  defaultValue: false,
  onValueChange: undefined,
};

export default Switch;
