/*
 ============================================================================
 Name        : LoginController.java
 Author      : Alessio Onori
 Version     : 1.0
 Copyright   : Your copyright notice
 Description : Controller per la gestione delle richieste di Login
 Implementata la sessione con un JWT, una specie di Cookie in formato JSON
 ============================================================================
 */

package it.iseed.controllers;

//import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.Date;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.User;
import it.iseed.services.LoginService;
import it.iseed.services.SessionService;

@RestController
@CrossOrigin
@RequestMapping("/authentication")
public class LoginController {

	private static final Logger log = LoggerFactory.getLogger(LoginController.class);
	
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private SessionService sessionService;


	@RequestMapping("/test")
    public String test(){
        return "Authentication service works correctly";
    }
	
	@RequestMapping("/test2")
    public ResponseEntity<JsonResponseBody> test2(){
		return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), "Authentication service works correctly" ));
    }
	
	/*
	 * vincolo su post!
	 * utilizzo della classe JsonResponseBody per uniformare le risposte
	 * 
	 * SESSIONE: mantenuta con un JWT, un particolare cookie di fatto, che viene restituito
	 * nel header al chiamante nel caso di avvenuta autenticazione con successo.
	 * 
	 * DA SISTEMARE, spostare il meccanismo di generazione jwt nel service dell'authenticate user
	 */
	@RequestMapping(
			value = "/logIn",
			method = RequestMethod.POST
			)
	public ResponseEntity<JsonResponseBody> logIn(@RequestBody UserRequest request) {

		/*
		 * il parametro userneme potrebbe contenere una mail
		 */

//		try {

			/*
			 * tento l'autenticazione: mi interfaccio con LoginService
			 */
			
			log.debug(request.toString());
		
			Optional<User> loggedUser = loginService.authenticateUser(request.getUsername(), request.getPassword());

			//check if user exists in DB -> if exists generate JWT and send back to client
			if( loggedUser.isPresent() ) {	
				/*
				 * utente correttamente loggato, caricato anche 
				 * il suo wallet
				 */

				//generate JWT: mi interfaccio con sessionService
				Optional<String> jwt = sessionService.createJwt(""+loggedUser.get().getId(), loggedUser.get().getUsername(), "user", new Date());
				if(jwt.isPresent()) {
					LoginResponse response= new LoginResponse();
					response.setSuccess(true);
					response.setToken(jwt.get());
					
					/*
					 * posso scegliere se restituire l'utente o una stringa di successo,
					 * basta commentare adeguatamente
					 * 
					 * Settaggio degli header per corretta tramsissione jwt
					 */
					return ResponseEntity.status(HttpStatus.OK)
							.header("Access-Control-Allow-Origin", "*")
							.header("Access-Control-Allow-Credentials", "true")
							.header("Access-Control-Allow-Headers", "jwt")
							.header("Access-Control-Expose-Headers", "jwt")
							//.header("jwt", jwt.get())
							.body(new JsonResponseBody(HttpStatus.OK.value(), response));
					//return ResponseEntity.status(HttpStatus.OK).header("jwt", jwt.get()).body(new JsonResponseBody(HttpStatus.OK.value(), loggedUser.get()));
				}
				else {
					/*
					 * possibile UnsupportedEncodingException
					 */
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "Token Error: UnsupportedEncodingException"));
				}

			}//if logged User is present
			else {
				return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), "Utente o Password errati" ) );
			}

//		}catch(Exception e) {
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new JsonResponseBody(HttpStatus.BAD_REQUEST.value(), "Error: " + e.toString()));
//		}

	}//login
	
	
	/*
	 * classe che wrappa la richiesta
	 */
	private static class UserRequest {
		
		String username;
		String password;
		
//		public UserRequest() {
//			super();
//		}
//
//		public void setUsername(String username) {
//			this.username = username;
//		}
//
//		public void setPassword(String password) {
//			this.password = password;
//		}

		public String getUsername() {
			return username;
		}

		public String getPassword() {
			return password;
		}

		@Override
		public String toString() {
			return "UserRequest [username=" + username + ", password=" + password + "]";
		}
	}
	
	private class LoginResponse{
		
		private boolean success;
		private String token;
		
		public boolean isSuccess() {
			return success;
		}
		public void setSuccess(boolean success) {
			this.success = success;
		}
		public String getToken() {
			return token;
		}
		public void setToken(String token) {
			this.token = token;
		}
		
		@Override
		public String toString() {
			String json = "{success:" + this.success + ",token:" +this.token +"}";
			return super.toString();
		}
		
	}
	
		
	

}
