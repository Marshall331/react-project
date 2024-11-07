import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Link,
    Preview,
    Section,
    Text
} from "@react-email/components";

const baseUrl =`https://${process.env.VERCEL_URL}`

const DropboxResetPasswordEmail = ({ userFirstname, resetPasswordLink }) => {
    return (
        <Html>
            <Head>
            </Head>
            <Preview>Dropbox reset your password</Preview>
            <Body style={{ backgroundColor: "#f6f9fc", padding: "10px 0" }}>
                <Container
                    style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #f0f0f0",
                        padding: "45px",
                        maxWidth: "600px",
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        href={resetPasswordLink}
                        style={{ width: "100%", maxWidth: "210px", padding: "12px" }}
                    >
                        Reset password
                    </Button>
                    To keep your account secure, please don&apos;t forward this email to anyone. See our Help Center for{" "}
                    <Link href="https://dropbox.com" underline="hover">
                        more security tips.
                    </Link>
                </Container>
            </Body>
        </Html>
    );
};

DropboxResetPasswordEmail.defaultProps = {
    userFirstname: "Alan",
    resetPasswordLink: "https://dropbox.com",
};

export default DropboxResetPasswordEmail;
