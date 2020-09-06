export default function errorNetworkSnackbar(enqueueSnackbar, statusCode, login = false) {
  statusCode = statusCode == null ? 0 : statusCode;
  let errorMessage;
  switch (statusCode) {
    case 0:
      errorMessage = "Немає підключення до інтернету";
      break;
    case 401:
      errorMessage = login ? "Неправльні пошта або пароль": "Не авторизовано";
      break;
    default:
      errorMessage = "Не вдалося зберегти зміни";
      break;
  }
  enqueueSnackbar(errorMessage, { variant: "error" });
}
