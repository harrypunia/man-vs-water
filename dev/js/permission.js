const removePermissionForm = dec => {
    if (dec == 'yes') {
        permission.style.animation = 'permissionOutYES .4s ease-in';
    } else {
        permission.style.animation = 'permissionOutNO .4s ease-in';
    }
    setTimeout(function () {
        permission.style.display = 'none';
        permission.innerHTML = '';
        form.style.opacity = '1';
        side.classList.add('sideIn');
    }, 390);
    side.classList.add('sideIn');
}
