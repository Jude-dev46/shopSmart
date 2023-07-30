import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../../constants/style";

const Input = ({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, isInvalid && styles.labelError]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputError]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  label: {
    color: Colors.primary50,
    marginBottom: 4,
    fontSize: 16,
  },
  labelError: {
    color: Colors.error600,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "#fff",
    borderRadius: 4,
    fontSize: 16,
    color: Colors.primary900,
  },
  inputError: {
    backgroundColor: Colors.error600,
  },
});
