import 'package:delivery/src/models/response_api.dart';
import 'package:delivery/src/models/user.dart';
import 'package:delivery/src/provider/user_provider.dart';
import 'package:delivery/src/utils/my_snackbar.dart';
import 'package:flutter/material.dart';

class RegisterController {
  BuildContext? context;
  TextEditingController emailController = TextEditingController();
  TextEditingController nameController = TextEditingController();
  TextEditingController lastNameController = TextEditingController();
  TextEditingController phoneController = TextEditingController();
  TextEditingController passController = TextEditingController();
  TextEditingController confirPassController = TextEditingController();
  UserProvider userProvider = UserProvider();

  Future? init(BuildContext context) {
    this.context = context;
    userProvider.init(context);
  }

  void register() async {
    String email = emailController.text.trim();
    String name = nameController.text.trim();
    String lastName = lastNameController.text.trim();
    String phone = phoneController.text.trim();
    String pass = passController.text.trim();
    String confirmPass = confirPassController.text.trim();

    if (email.isEmpty ||
        name.isEmpty ||
        lastName.isEmpty ||
        phone.isEmpty ||
        pass.isEmpty ||
        confirmPass.isEmpty) {
      MySnackbar.show(context!, "Debes Ingresar Todos los Datos");
      return;
    }

    if (pass != confirmPass) {
      MySnackbar.show(context!, "Las Contraseñas No coinciden");
      return;
    }

    if (pass.length < 6) {
      MySnackbar.show(context!, "La Contraseña tiene menos de 6 Digitos");
      return;
    }

    User user = User(
        email: email,
        password: pass,
        name: name,
        lastname: lastName,
        phone: phone);

    ResponseApi responseApi = await userProvider.create(user);

    MySnackbar.show(context!, responseApi.message!);
    print('Respuesta: ${responseApi.toJson()} ');
  }
}
