/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author SirKy
 */

import Controlador.ControladorUsuario;
import Modelo.ModeloUsuario;
import Vista.FrmVistaUsuario;

public class ClienteBd {
    public static void main(String[] args) {
        FrmVistaUsuario vista      = new FrmVistaUsuario();
        ModeloUsuario   modelo     = new ModeloUsuario();
        ControladorUsuario ctrl    = new ControladorUsuario(vista, modelo);
        ctrl.iniciar();
    }
}