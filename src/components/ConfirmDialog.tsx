import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CenterModal } from './Sheet';
import { colors, radius, scale, typography } from '../theme';

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  cancelLabel?: string;
  confirmLabel: string;
  destructive?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmDialog({
  visible,
  title,
  message,
  cancelLabel = 'Cancel',
  confirmLabel,
  destructive = true,
  onCancel,
  onConfirm,
}: ConfirmDialogProps): React.JSX.Element {
  return (
    <CenterModal visible={visible} onClose={onCancel} style={styles.card}>
      <View style={styles.body}>
        <Text style={[typography.heading, styles.title]}>{title}</Text>
        <Text style={[typography.small, styles.message]}>{message}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={onCancel}
          style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}>
          <Text style={[typography.button, styles.cancelLabel]}>{cancelLabel}</Text>
        </Pressable>
        <View style={styles.actionDivider} />
        <Pressable
          accessibilityRole="button"
          onPress={onConfirm}
          style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}>
          <Text
            style={[
              typography.button,
              destructive ? styles.destructiveLabel : styles.confirmLabel,
            ]}>
            {confirmLabel}
          </Text>
        </Pressable>
      </View>
    </CenterModal>
  );
}

const styles = StyleSheet.create({
  card: {
    maxWidth: scale(320),
  },
  body: {
    alignItems: 'center',
    paddingBottom: scale(18),
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginTop: scale(8),
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
    marginHorizontal: -scale(22),
    marginBottom: -scale(22),
  },
  action: {
    flex: 1,
    height: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionPressed: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  actionDivider: {
    width: 1,
    backgroundColor: colors.borderSoft,
  },
  cancelLabel: {
    color: colors.primary,
  },
  confirmLabel: {
    color: colors.primary,
    fontWeight: '700',
  },
  destructiveLabel: {
    color: colors.danger,
    fontWeight: '700',
  },
  sheetRadius: {
    borderRadius: radius.lg,
  },
});
