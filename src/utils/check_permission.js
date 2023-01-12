export function checkPermission(name) {
  let permissions = localStorage.getItem("userPermissions");
  if (permissions) {
    let userPermissions = JSON.parse(permissions);
    let hasPermission = userPermissions.some((item, index) => {
      return item.module === name;
    });
    return hasPermission;
    //  return true;
  } else {
    return false;
  }
}
