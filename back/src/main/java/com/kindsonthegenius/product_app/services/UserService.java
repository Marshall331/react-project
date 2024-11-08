package com.kindsonthegenius.product_app.services;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.kindsonthegenius.product_app.model.PasswordResetRequest;
import com.kindsonthegenius.product_app.model.User;
import com.kindsonthegenius.product_app.repositories.UserRepository;
import com.kindsonthegenius.product_app.utils.GenerateRandomToken;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;

@Service
public class UserService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder,
            BCryptPasswordEncoder bCryptPasswordEncoder1) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder1;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUser(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public String addUser(User user) {
        String result = "";

        if (this.userRepository.findByEmail(user.getEmail()) != null) {
            result += "Un compte avec cette email existe déjà. \n";
        }
        if (this.userRepository.findByUsername(user.getUsername()) != null) {
            result += "Un compte avec ce pseudo existe déjà. \n";
        }
        if (result.equals("")) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        }
        return result;
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    public Object authenticate(String email, String password) {
        String result = "";
        User user = getUserFromEmail(email);

        if (user != null) {
            if (!bCryptPasswordEncoder.matches(password, user.getPassword())) {
                result += "Le mot de passe est incorrect. \n";
            }
        } else {
            result += "Ce compte n'existe pas. \n";
        }

        if (result.isEmpty()) {
            return user;
        }

        return result;
    }

    public User getUserFromEmail(String email) {
        User user = userRepository.findByEmail(email);
        return (user == null || !(user.getEmail().equals(email))) ? null : user;
    }

    public String SendResetPasswordEmail(String email) {
        String result = "";
        User user = getUserFromEmail(email);

        if (user == null) {
            result += "Ce compte n\'existe pas. \n";
        } else {
            // SENDING THE EMAIL HERE

            user.setResetPasswordToken(GenerateRandomToken.generate());

            result += sendPasswordResetEmail(user.getUsername(), user.getResetPasswordToken(), user.getEmail());
            userRepository.save(user);
        }

        return result;
    }

    public static String sendPasswordResetEmail(String username, String resetToken, String sendTo) {
        Resend resend = new Resend("re_UYoL3aD8_Boy9gDu3dkkzYEgsSn713Bsa");

        String htmlContent = "<html><body style='background-color:#f6f9fc;padding:10px 0;'>"
                + "<div style='background-color:#ffffff;border:1px solid #f0f0f0;padding:45px;'>"
                + "<p style='font-size:16px;font-family:\"Open Sans\", sans-serif;font-weight:300;color:#404040;line-height:26px;'>"
                + "Bonjour " + username + ",</p>"
                + "<p style='font-size:16px;font-family:\"Open Sans\", sans-serif;font-weight:300;color:#404040;line-height:26px;'>"
                + "Quelqu'un a récemment demandé un changement de mot de passe pour votre compte."
                + " Si c'était vous, vous pouvez définir un nouveau mot de passe en suivant ce lien :</p>"
                + "<a href='http://localhost:5173/reset-password/" + resetToken + "' "
                + "style='background-color:#007ee6;border-radius:4px;color:#fff;font-family:\"Open Sans\", Arial;font-size:16px;text-decoration:none;padding:14px 7px;width:100%;text-align:center;display:block;'>"
                + "Réinitialiser mon mot de passe</a>"
                + "<p style='font-size:16px;font-family:\"Open Sans\", sans-serif;font-weight:300;color:#404040;line-height:26px;'>"
                + "Si vous ne souhaitez pas changer votre mot de passe ou si vous n'avez pas demandé ce changement, ignorez et supprimez simplement ce message.</p>"
                + "<p style='font-size:16px;font-family:\"Open Sans\", sans-serif;font-weight:300;color:#404040;line-height:26px;'>"
                + "Pour sécuriser votre compte, veuillez ne pas transférer cet e-mail à qui que ce soit.</p>"
                + "<p style='font-size:16px;font-family:\"Open Sans\", sans-serif;font-weight:300;color:#404040;line-height:26px;'>Bonne journée !</p>"
                + "</div></body></html>";

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("Acme <onboarding@resend.dev>")
                .to(sendTo)
                .subject("Réinitialiser votre mot de passe")
                .html(htmlContent)
                .build();

        try {
            resend.emails().send(params);
            return "";
        } catch (ResendException e) {
            return "Une erreur est survenue lors de l\'envoi du mail.";
        }
    }

    public String resetPassword(PasswordResetRequest request) {
        String result = "";
        User user = verifyResetToken(request.getResetToken());

        if (user != null) {
            user.setPassword(bCryptPasswordEncoder.encode(request.getNewPassword()));
            user.setResetPasswordToken(null);
            userRepository.save(user);
        } else {
            result += "La demande de réinitialisation a expiré, merci de soumettre une nouvelle demande. \n";
        }

        return result;
    }

    public User verifyResetToken(String token) {
        User user = userRepository.findByResetPasswordToken(token);
        return (user == null) ? null : user;
    }
}
