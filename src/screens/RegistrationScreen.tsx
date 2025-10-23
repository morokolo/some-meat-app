import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';

const RegistrationScreen = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    mobileNumber: '+27 | 72 815 4332',
    password: '********',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const clearInput = (field: string) => {
    setFormData(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity>
          <Text style={commonStyles.backButton}>‹</Text>
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Explore app</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to Pantry by Marble</Text>
          <Text style={commonStyles.subtitle}>
            Sign up for easy payment, collection and much more.
          </Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          {/* Full Name */}
          <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.inputLabel}>Full name</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[commonStyles.input, styles.input]}
                value={formData.fullName}
                onChangeText={(value) => handleInputChange('fullName', value)}
                placeholder="Enter your full name"
              />
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => clearInput('fullName')}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Email */}
          <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.inputLabel}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[commonStyles.input, styles.input]}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => clearInput('email')}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Mobile Number */}
          <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.inputLabel}>Mobile number</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[commonStyles.input, styles.input]}
                value={formData.mobileNumber}
                onChangeText={(value) => handleInputChange('mobileNumber', value)}
                placeholder="Enter your mobile number"
                keyboardType="phone-pad"
              />
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => clearInput('mobileNumber')}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Password */}
          <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.inputLabel}>Create password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[commonStyles.input, styles.input]}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="Create a password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeButtonText}>👁</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={commonStyles.button}>
            <Text style={commonStyles.buttonText}>Sign up</Text>
          </TouchableOpacity>

          <View style={styles.loginSection}>
            <Text style={styles.loginText}>Have an account? </Text>
            <TouchableOpacity>
              <Text style={commonStyles.linkText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={commonStyles.divider}>
            <View style={commonStyles.dividerLine} />
            <Text style={commonStyles.dividerText}>or</Text>
            <View style={commonStyles.dividerLine} />
          </View>

          <TouchableOpacity style={[commonStyles.button, commonStyles.secondaryButton]}>
            <Text style={[commonStyles.buttonText, commonStyles.secondaryButtonText]}>
              Explore our app
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={commonStyles.footer}>
        <Text style={commonStyles.footerText}>
          By signing up you agree to our,{' '}
          <Text style={commonStyles.linkText}>Terms</Text>,{' '}
          <Text style={commonStyles.linkText}>Data Policy</Text>, and{' '}
          <Text style={commonStyles.linkText}>Cookies Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    fontFamily: 'serif',
  },
  formSection: {
    marginBottom: 40,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    paddingRight: 40,
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: colors.textLight,
    fontWeight: 'bold',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeButtonText: {
    fontSize: 16,
  },
  actionSection: {
    marginBottom: 100,
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 16,
    color: colors.textLight,
  },
});

export default RegistrationScreen;
