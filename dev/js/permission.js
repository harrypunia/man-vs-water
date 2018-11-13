const removePermissionForm = dec => {
    dec == 'yes' ? permission.style.animation = 'permissionOutYES .3s ease-in' : permission.style.animation = 'permissionOutNO .3s ease-in';
    side.classList.add('sideIn');

    setTimeout(() => {
        permission.style.display = 'none';
        form.style.opacity = '1';
    }, 390);
}
