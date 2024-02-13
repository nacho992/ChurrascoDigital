import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";


export class NotificationHelper {
    private static getToastOpts(): SweetAlertOptions {
        return {
            toast: true,
            position: 'top-end',
            showDenyButton: false,
            showConfirmButton: false,
            timer: 4500,
        };
    }

    public static showErrorMessage(msg: string) {
        const opts = this.getToastOpts();
        opts.title = msg;
        opts.icon = 'error';

        return Swal.fire(opts);
    }

    public static showSuccessMessage(msg: string) {
        const opts = this.getToastOpts();
        opts.title = msg;
        opts.icon = 'success';

        return Swal.fire(opts);
    }
}