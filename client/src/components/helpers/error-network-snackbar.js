export default function errorNetworkSnackbar(
  enqueueSnackbar,
  response,
  login = false
) {
  if (response == null) {
    enqueueSnackbar("Упсс, перевірте ваше підключення до інтернету", { variant: "error" });
    return;
  }
  const { message = null, statusCode } = response.data;
  let errorMessage;
  switch (statusCode) {
    case 401:
      errorMessage = login ? "Неправльні пошта або пароль" : "Не авторизовано";
      break;
    default:
      errorMessage = "Не вдалося зберегти зміни. " + (message ? `${message}` : '');
      break;
  }
  enqueueSnackbar(errorMessage, { variant: "error" });
}
