import {ActivityIndicator, Surface} from 'react-native-paper';

export default function LoadingScreen() {
  return (
    <Surface
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" />
    </Surface>
  );
}
