import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    // Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";

export default function EmailTemplate({ username, resetToken }) {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>Reset your password</Preview>
                <Container style={container}>
                    <Section style={logo}>
                        <Img width={114} src={"/static/vercel-team.png"} />
                    </Section>
                    <Section>
                        <Text style={text}>Bonjour {username},</Text>
                        <Text style={text}>
                            Quelqu&apos;un a récemment demandé un changement de mot de passe de votre compte.
                            Si c&apos;était vous, vous pouvez définir un nouveau mot de passe en suivant ce lien :
                        </Text>
                        <Button style={button}
                            href={`http://localhost:5173/reset-password?resetToken=${resetToken}`}
                        >
                            Réinitialiser mon mot de passe
                        </Button>
                        <Text style={text}>
                            Si vous ne souhaitez pas changer votre mot de passe ou si vous n&apos;avez pas
                            demandé ce changement, ignorez et supprimez simplement ce message.
                        </Text>
                        <Text style={text}>
                            Pour sécuriser votre compte, veuillez ne pas transférer cet e-mail
                            à qui que ce soit.
                        </Text>
                        <Text style={text}>Bonne journée !</Text>

                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: "#f6f9fc",
    padding: "10px 0",
};

const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #f0f0f0",
    padding: "45px",
};

const text = {
    fontSize: "16px",
    fontFamily:
        "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: "300",
    color: "#404040",
    lineHeight: "26px",
};

const logo = {
    display: "flex",
    justifyContent: "center",
    alingItems: "center",
};

const button = {
    backgroundColor: "#007ee6",
    borderRadius: "4px",
    color: "#fff",
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    width: "100%",
    padding: "14px 7px",
};