export const showErrorSnackbar = (enqueueSnackbar, message) => {
    enqueueSnackbar(message, {
      variant: "error",
      anchorOrigin: { horizontal: "center", vertical: "bottom" },
      autoHideDuration: 2000
    });
}
