export default function errorNetworkSnackbar(enqueueSnackbar, statusCode) {
  let errorMessage;
  switch (statusCode) {
    case 401:
      errorMessage = "Авторизуйтеся";
      break;
    default:
      errorMessage = "Не вдалося зберегти зміни";
      break;
  }
  enqueueSnackbar(errorMessage, { variant: "error" });
}
