/*
 ============================================================================
 Name        : LoginController.java
 Author      : Alessio Onori
 Version     : 1.0
 Copyright   : Your copyright notice
 Description : Controller per la gestione delle richieste di Login
 ============================================================================
 */

package it.iseed.controllers;

import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.User;
import it.iseed.services.LoginService;

@Controller
public class LoginController {

	@Autowired
	private LoginService loginService;



	/*
	 * vincolo su post!
	 * utilizzo della classe JsonResponseBody per uniformare le risposte
	 */
	@RequestMapping(
			value = "/authentication/logIn",
			params = { "username", "password" }, 
			method = RequestMethod.POST
			)
	public ResponseEntity<JsonResponseBody> userCheck(@RequestParam (value = "username") String username, @RequestParam (value = "password") String password ) {

		/*
		 * il parametro userneme potrebbe contenere una mail
		 */

		try {

			/*
			 * tento l'autenticazione
			 */
			Optional<User> loggedUser = loginService.authenticateUser(username, password);

			if( loggedUser.isPresent() ) {	
				/*
				 * utente correttamente loggato, caricato anche 
				 * il suo wallet
				 */

				/*
				 * aggiungo l'utente correttamente loggato alla sessione
				 */
				//request.getSession().setAttribute("loggedUser", loggedUser.get());

				return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), loggedUser.get() ) );

			}//if
			else {
				return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), "Utente o Password errati" ) );
			}

		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new JsonResponseBody(HttpStatus.BAD_REQUEST.value(), "Error: " + e.toString()));
		}

	}




}
