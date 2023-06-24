import { Box, NativeBaseProvider } from "native-base";
import { ListImage, RecyclerView } from "../../src/components";
import { photos } from "../../src/services/sampleData/photos";
import { Dimensions } from "react-native";
import { theme } from "../../src/assets/themes/light_theme";
import { SafeAreaView } from "react-native-safe-area-context";

export function TestImages() {
  const { width } = Dimensions.get('window')
  return (
    <NativeBaseProvider theme={theme}>
      <RecyclerView
        data={[...photos, ...photos, ...photos, ...photos, ...photos, ...photos]}
        column={3}
        width='full'
        space={4} />
    </NativeBaseProvider>
  )
}