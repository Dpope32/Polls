import { Button } from "../Button";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "../Text";
import { colors } from "@/app/styles/colors";

export function Footer() {
    return (
        <View style={styles.footer}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/AppImages/ios/29.png')} style={styles.logo} />
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    size="small" 
                    variant="outline" 
                    onPress={() => {}}
                    style={styles.footerButton}
                > 
                    <Text variant="small" style={styles.footerButtonText}>Home</Text> 
                </Button>
                <Button 
                    size="small" 
                    variant="outline" 
                    onPress={() => {}}
                    style={styles.footerButton}
                > 
                    <Text variant="small" style={styles.footerButtonText}>Docs</Text> 
                </Button>
                <Button 
                    size="small" 
                    variant="outline" 
                    onPress={() => {}}
                    style={styles.footerButton}
                > 
                    <Text variant="small" style={styles.footerButtonText}>Help</Text> 
                </Button>
                <Button 
                    size="small" 
                    variant="outline" 
                    onPress={() => {}}
                    style={styles.footerButton}
                > 
                    <Text variant="small" style={styles.footerButtonText}>Contact</Text> 
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        backgroundColor: colors.background,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        height: 60,
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
    },
    logo: {
        width: 32,
        height: 32,
        opacity: 0.9,
    },
    footerButton: {
        minHeight: 28,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
        backgroundColor: 'rgba(39, 39, 42, 0.5)',
        borderColor: colors.borderLight,
    },
    footerButtonText: {
        fontSize: 12,
        fontWeight: '400' as const,
        color: colors.textMuted,
    },
});