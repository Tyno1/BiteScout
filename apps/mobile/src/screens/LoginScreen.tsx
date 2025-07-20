import type { StackNavigationProp } from "@react-navigation/stack";
import type React from "react";
import { useState } from "react";
import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackParamList } from "../../App";

type LoginScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Login"
>;

interface Props {
	navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		if (!email || !password) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		// TODO: Implement actual login logic
		Alert.alert("Success", "Login functionality to be implemented");
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<View style={styles.header}>
					<Text style={styles.title}>Welcome Back</Text>
					<Text style={styles.subtitle}>Sign in to your account</Text>
				</View>

				<View style={styles.form}>
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

					<TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
						<Text style={styles.loginButtonText}>Login</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.registerLink}
						onPress={() => navigation.navigate("Register")}
					>
						<Text style={styles.registerText}>
							Don't have an account?{" "}
							<Text style={styles.registerLinkText}>Register</Text>
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8fafc",
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
	loginButton: {
		backgroundColor: "#f97316",
		padding: 16,
		borderRadius: 12,
		alignItems: "center",
		marginTop: 10,
	},
	loginButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	registerLink: {
		alignItems: "center",
		marginTop: 20,
	},
	registerText: {
		fontSize: 14,
		color: "#64748b",
	},
	registerLinkText: {
		color: "#f97316",
		fontWeight: "600",
	},
});

export default LoginScreen;
