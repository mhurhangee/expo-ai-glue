import { Alert, AlertIcon, AlertText } from '@/components/ui/alert';
import { InfoIcon } from '@/components/ui/icon';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ErrorScreen({ errorMessage }: { errorMessage: string }) {
    return (
        <SafeAreaView>
            <Alert action="error" variant="solid">
                <AlertIcon as={InfoIcon} />
                <AlertText>{errorMessage}</AlertText>
            </Alert>
        </SafeAreaView>
    );
}
