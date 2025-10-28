import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@styles/colors';
import OliveDivider from '@/components/divider/OliveDivider';
import { commonStyles } from '@styles/commonStyles';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { loginThunk } from '@/stores/features/registration/registrationSlice';
import { fetchAllProducts } from '@/stores/features/products/productsSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector(state => state.registration);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (token && !loading) {
      dispatch(fetchAllProducts());
      navigation.navigate('MainTabs' as never); // or the actual route for products page
    }
  }, [token, loading, dispatch, navigation]);

  useEffect(() => {
    if (error) setShowError(true);
  }, [error]);

  useEffect(() => {
    if (error) {
      setShowError(true);
      Alert.alert('Sign up failed', error);
    }
  }, [error]);

  const RegistrationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    mobileNumber: Yup.string().required('Mobile number is required'),
    password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
  });

  const handleExploreApp = () => {
    navigation.navigate('MainTabs' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity>
          <Text style={commonStyles.backButton}>‹</Text>
        </TouchableOpacity>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginHorizontal:20}}>
       
        <Text style={{   fontSize: 16,

    color: colors.text,
    fontFamily: 'Avenir-Roman',
    fontWeight: '100', alignContent: 'flex-end', alignSelf: 'flex-end'}}>Explore app</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome to {'\n'}<Text>Pantry by Marble</Text></Text>
       
          <Text style={styles.subtitleAvenir}>
            Sign up for easy payment, collection
            {'\n'}
            <Text>and much more.</Text>
          </Text>
          <OliveDivider style={{ marginBottom: 40 }} height={15} />
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Formik
            initialValues={{
              fullName: 'mor_2314',
              email: 'john.doe@email.com',
              mobileNumber: '+27 | 72 815 4332',
              password: '83r5^_',
            }}
            validationSchema={RegistrationSchema}
            onSubmit={values => {
              setShowError(false);
              dispatch(loginThunk({ username: values.fullName, password: values.password }));
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isSubmitting }) => (
              <View style={styles.formSection}>
                {/* Full Name */}
                <View style={commonStyles.inputContainer}>
                  <Text style={commonStyles.inputLabel}>Full name</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={[commonStyles.input, styles.input]}
                      value={values.fullName}
                      onChangeText={handleChange('fullName')}
                      onBlur={handleBlur('fullName')}
                      placeholder='Enter your full name'
                      accessibilityLabel='Full name'
                    />
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => handleChange('fullName')('')}
                      accessibilityRole='button'
                      accessibilityLabel='Clear full name'
                    >
                      <Text style={styles.clearButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                  {touched.fullName && errors.fullName ? (
                    <Text style={{ color: colors.error }}>{errors.fullName}</Text>
                  ) : null}
                </View>

                {/* Email */}
                <View style={commonStyles.inputContainer}>
                  <Text style={commonStyles.inputLabel}>Email</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={[commonStyles.input, styles.input]}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      placeholder='Enter your email'
                      keyboardType='email-address'
                      autoCapitalize='none'
                      accessibilityLabel='Email address'
                    />
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => handleChange('email')('')}
                      accessibilityRole='button'
                      accessibilityLabel='Clear email'
                    >
                      <Text style={styles.clearButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                  {touched.email && errors.email ? (
                    <Text style={{ color: colors.error }}>{errors.email}</Text>
                  ) : null}
                </View>

                {/* Mobile Number */}
                <View style={commonStyles.inputContainer}>
                  <Text style={commonStyles.inputLabel}>Mobile number</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={[commonStyles.input, styles.input]}
                      value={values.mobileNumber}
                      onChangeText={handleChange('mobileNumber')}
                      onBlur={handleBlur('mobileNumber')}
                      placeholder='Enter your mobile number'
                      keyboardType='phone-pad'
                      accessibilityLabel='Mobile number'
                    />
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => handleChange('mobileNumber')('')}
                      accessibilityRole='button'
                      accessibilityLabel='Clear mobile number'
                    >
                      <Text style={styles.clearButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                  {touched.mobileNumber && errors.mobileNumber ? (
                    <Text style={{ color: colors.error }}>{errors.mobileNumber}</Text>
                  ) : null}
                </View>

                {/* Password */}
                <View style={commonStyles.inputContainer}>
                  <Text style={commonStyles.inputLabel}>Create password</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={[commonStyles.input, styles.input]}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      placeholder='Create a password'
                      secureTextEntry={!showPassword}
                      accessibilityLabel='Password'
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                      accessibilityRole='button'
                      accessibilityLabel='Toggle password visibility'
                    >
                      <Text style={styles.eyeButtonText}>👁</Text>
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password ? (
                    <Text style={{ color: colors.error }}>{errors.password}</Text>
                  ) : null}
                </View>

                {/* Action Buttons */}
                <View style={styles.actionSection}>
                  <TouchableOpacity
                    style={commonStyles.button}
                    onPress={() => handleSubmit()}
                    disabled={!isValid || loading || isSubmitting}
                    accessibilityRole='button'
                    accessibilityLabel='Sign up'
                  >
                    {loading ? (
                      <ActivityIndicator color={colors.white} style={{ marginVertical: 4 }} />
                    ) : (
                      <Text style={commonStyles.buttonText}>Sign up</Text>
                    )}
                  </TouchableOpacity>

                  {showError && error && (
                    <Text style={{ color: colors.error, marginTop: 8, textAlign: 'center' }}>{error}</Text>
                  )}

                  <View style={styles.loginSection}>
                    <Text style={styles.loginText} numberOfLines={1}>Have an account? </Text>
                    <TouchableOpacity accessibilityRole='button' accessibilityLabel='Login'>
                      <Text style={commonStyles.linkText} numberOfLines={1}>Login</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={commonStyles.divider}>
                    <View style={commonStyles.dividerLine} />
                    <Text style={commonStyles.dividerText}>or</Text>
                    <View style={commonStyles.dividerLine} />
                  </View>

                  <TouchableOpacity
                    style={[commonStyles.button]}
                    onPress={handleExploreApp}
                    disabled={loading}
                    accessibilityRole='button'
                    accessibilityLabel='Explore our app'
                  >
                    <Text style={[commonStyles.buttonText]}>Explore our app</Text>
                  </TouchableOpacity>
                  {/* Footer */}
                  <View>
                    <Text style={commonStyles.footerText}>
                      By signing up you agree to our,{' '}
                      <Text style={commonStyles.linkTextSecondary}>Terms</Text>,{' '}
                      <Text style={commonStyles.linkTextSecondary}>Data Policy</Text>, and{' '}
                      <Text style={commonStyles.linkTextSecondary}>Cookies Policy</Text>
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>

      
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
    fontSize: 40,
    color: colors.textOlive,
    marginBottom: 12,
    fontFamily: 'AGaramondPro-BoldItalic',
  },
  subtitleAvenir: {
    fontSize: 16,
    color: colors.textOlive,
    marginBottom: 10,
    fontFamily: 'Avenir-Roman',
    fontWeight: '100'
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
    color:colors.primary
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
    alignItems: 'baseline',
    flexWrap: 'nowrap',
  },
  loginText: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: 'Avenir-Roman',
  },
});

export default RegistrationScreen;
