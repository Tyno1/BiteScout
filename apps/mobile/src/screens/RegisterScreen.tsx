import type { StackNavigationProp } from "@react-navigation/stack";
import type React from "react";
import { useState } from "react";
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackParamList } from "../../App";

type RegisterScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Register"
>;

interface Props {
	navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleRegister = () => {
		if (!name || !email || !password || !confirmPassword) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		if (password !== confirmPassword) {
			Alert.alert("Error", "Passwords do not match");
			return;
		}

		if (password.length < 6) {
			Alert.alert("Error", "Password must be at least 6 characters long");
			return;
		}

		// TODO: Implement actual registration logic
		Alert.alert("Success", "Registration functionality to be implemented");
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.content}>
					<View style={styles.header}>
						<Text style={styles.title}>Create Account</Text>
						<Text style={styles.subtitle}>Join BiteScout today</Text>
					</View>

					<View style={styles.form}>
						<View style={styles.inputContainer}>
							<Text style={styles.label}>Full Name</Text>
							<TextInput
								style={styles.input}
								value={name}
								onChangeText={setName}
								placeholder="Enter your full name"
								autoCapitalize="words"
							/>
						</View>

						<View style={styles.inputContainer}>
							<Text style={styles.label}>Email</Text>
							<TextInput
								style={styles.input}
								value={email}
								onChangeText={setEmail}
								placeholder="Enter your email"
								keyboardType="email-address"
								autoCapitalize="none"
							/>
						</View>

						<View style={styles.inputContainer}>
							<Text style={styles.label}>Password</Text>
							<TextInput
								style={styles.input}
								value={password}
								onChangeText={setPassword}
								placeholder="Enter your password"
								secureTextEntry
							/>
						</View>

						<View style={styles.inputContainer}>
							<Text style={styles.label}>Confirm Password</Text>
							<TextInput
								style={styles.input}
								value={confirmPassword}
								onChangeText={setConfirmPassword}
								placeholder="Confirm your password"
								secureTextEntry
							/>
						</View>

						<TouchableOpacity
							style={styles.registerButton}
							onPress={handleRegister}
						>
							<Text style={styles.registerButtonText}>Create Account</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.loginLink}
							onPress={() => navigation.navigate("Login")}
						>
							<Text style={styles.loginText}>
								Already have an account?{" "}
								<Text style={styles.loginLinkText}>Login</Text>
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8fafc",
	},
	scrollContent: {
		flexGrow: 1,
	},
	content: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
	},
	header: {
		alignItems: "center",
		marginBottom: 40,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#1e293b",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: "#64748b",
	},
	form: {
		gap: 20,
	},
	inputContainer: {
		gap: 8,
	},
	label: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1e293b",
	},
	input: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#e2e8f0",
		borderRadius: 12,
		padding: 16,
		fontSize: 16,
	},
	registerButton: {
		backgroundColor: "#f97316",
		padding: 16,
		borderRadius: 12,
		alignItems: "center",
		marginTop: 10,
	},
	registerButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	loginLink: {
		alignItems: "center",
		marginTop: 20,
	},
	loginText: {
		fontSize: 14,
		color: "#64748b",
	},
	loginLinkText: {
		color: "#f97316",
		fontWeight: "600",
	},
});

export default RegisterScreen;
