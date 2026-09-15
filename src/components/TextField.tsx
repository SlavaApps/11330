import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { colors, fontSize, radius, scale, typography } from '../theme';

interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  hint?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  align?: 'left' | 'center';
}

export function TextField({
  label,
  hint,
  style,
  inputStyle,
  align = 'left',
  ...rest
}: TextFieldProps): React.JSX.Element {
  const [focused, setFocused] = useState(false);

  return (
    <View style={style}>
      {label ? <Text style={[typography.label, styles.label]}>{label.toUpperCase()}</Text> : null}
      <View style={[styles.field, focused && styles.fieldFocused]}>
        <TextInput
          placeholderTextColor={colors.textFaint}
          selectionColor={colors.primary}
          {...rest}
          onFocus={event => {
            setFocused(true);
            rest.onFocus?.(event);
          }}
          onBlur={event => {
            setFocused(false);
            rest.onBlur?.(event);
          }}
          style={[styles.input, align === 'center' && styles.inputCenter, inputStyle]}
        />
      </View>
      {hint ? <Text style={[typography.tiny, styles.hint]}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: scale(7),
  },
  field: {
    height: scale(48),
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    justifyContent: 'center',
    paddingHorizontal: scale(14),
  },
  fieldFocused: {
    borderColor: 'rgba(59,130,246,0.55)',
    backgroundColor: 'rgba(59,130,246,0.07)',
  },
  input: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: fontSize(15),
    padding: 0,
  },
  inputCenter: {
    textAlign: 'center',
  },
  hint: {
    marginTop: scale(6),
    color: colors.textFaint,
  },
});
