package net.ausiasmarch.gesportin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.ausiasmarch.gesportin.bean.SessionBean;
import net.ausiasmarch.gesportin.bean.TokenBean;


@Service
public class SessionService {

    @Autowired
    private JWTService oJwtService;

    public TokenBean login(SessionBean oSessionBean) {
        // Lógica de autenticación aquí
        // hardcoded
        if ("admin".equals(oSessionBean.getUsername()) && "7e4b4f5529e084ecafb996c891cfbd5b5284f5b00dc155c37bbb62a9f161a72e".equalsIgnoreCase(oSessionBean.getPassword())) { //ausias
            // generar el token JWT
            return (new TokenBean(oJwtService.generateJWT(oSessionBean.getUsername())));
        } else {
            return null; // Autenticación fallida Rafa -> cambiar por excepcion
        }
    }

    public boolean isSessionActive() {
        String username = (String) org.springframework.web.context.request.RequestContextHolder.currentRequestAttributes()
                .getAttribute("username", org.springframework.web.context.request.RequestAttributes.SCOPE_REQUEST);
        return username != null;
    }

    public String getUsername() {
        String username = (String) org.springframework.web.context.request.RequestContextHolder.currentRequestAttributes()
                .getAttribute("username", org.springframework.web.context.request.RequestAttributes.SCOPE_REQUEST);
        return username;
    }

}
