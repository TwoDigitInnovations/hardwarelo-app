import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  LoadingController,
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
// import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
// import write_blob from 'capacitor-blob-writer'
// import * as XLSX from 'xlsx'
// import * as pdfmake from 'pdfmake/build/pdfmake';
// import * as pdffonts from 'pdfmake/build/vfs_fonts';


@Injectable({
  providedIn: 'root',
})
export class CommonService {
  Base_url = environment.url;
  token: any = '';
  duration: any = {
    distance: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  imgUrl: any = 'https://techonika.in/ims_final/assets/uploads/'
  constructor(
    public http: HttpClient,
    private toastController: ToastController,
    // private spinner: LoadingController,
    private modalCtrl: ModalController,
    private spinner: NgxSpinnerService,
    private routr: Router,
  ) { }

  handleError(error: HttpErrorResponse) {
    console.log(error)
    console.log(error.status)
    if (error.status === 401) {
      console.log(error.status)
      this.presentToaster(error.error.message)
      this.logout()
      console.error('An error occurred:', error.error);
    }

    return throwError(error);
  }

  logout() {
    // localStorage.clear()
    localStorage.removeItem('userDetails')
    localStorage.removeItem('token')
    this.routr.navigate(['/sign-in'])
  }

  httpHeaders() {
    const token = localStorage.getItem('token');
    this.token = token ? token : '';
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `jwt ${this.token}`);
    return headers;
  }

  post(u: any, data: any) {
    const url = this.Base_url + u;
    return this.http.post(url, data, { headers: this.httpHeaders() }).pipe(tap((res: any) => {
    }), catchError(this.handleError.bind(this)));
  }

  delete(u: any, data?: any) {
    const url = this.Base_url + u;
    return this.http.delete(url, { headers: this.httpHeaders(), body: data }).pipe(tap((res: any) => {
    }), catchError(this.handleError.bind(this)));
  }

  get(u: any, data?: any) {
    const url = this.Base_url + u;
    return this.http.get(url, { headers: this.httpHeaders(), params: data }).pipe(tap((res: any) => {
    }), catchError(this.handleError.bind(this)));
  }

  async presentToaster(message: any, position?: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position,
    });

    await toast.present();
  }

  //show loader
  async showLoading(msg: string = 'Please wait...') {
    // const loader = await this.spinner.create();
    // loader.present();
    this.spinner.show();
  }

  async hideLoading() {
    // this.spinner.dismiss();
    this.spinner.hide();
  }

  convetMinutstoHours(totalMinutes: any) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours > 10 ? hours : '0' + hours}:${minutes > 10 ? minutes : '0' + minutes} Hrs`;
  }

  timeSince(date: Date) {
    const diff = new Date().valueOf() - date.valueOf();
    const seconds: any = Math.floor(diff / 1000);
    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + ' Years';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) > 1 ? ' Months' : ' Month') +
        ' ago'
      );
    }
    interval = seconds / 604800;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) > 1 ? ' Weeks' : ' Week') +
        ' ago'
      );
    }

    interval = seconds / 86400;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) > 1 ? ' Days' : ' Day') +
        ' ago'
      );
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) > 1 ? ' Hours' : ' Hour') +
        ' ago'
      );
    }
    interval = seconds / 60;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) > 1 ? ' Min' : ' min') +
        ' ago'
      );
    }
    return 'Just now';
  }

  countDown(date: any) {
    // return new Promise((resolve) => {
    // let count: any
    // var distance = 0
    // var days = 0
    // var hours = 0
    // var minutes = 0
    // var seconds = 0
    this.duration = {
      distance: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    // var x = setInterval(() => {
    var countDownDate = new Date(date).getTime();
    // console.log(countDownDate)
    var now = new Date().getTime();
    this.duration.distance = countDownDate - now;
    this.duration.days = Math.floor(
      this.duration.distance / (1000 * 60 * 60 * 24)
    );
    this.duration.hours = Math.floor(
      (this.duration.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    this.duration.minutes = Math.floor(
      (this.duration.distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    this.duration.seconds = Math.floor(
      (this.duration.distance % (1000 * 60)) / 1000
    );
    if (this.duration.distance < 0) {
      // clearInterval(x);
      return;
    }
    // console.log(
    //   this.duration.days,
    //   this.duration.hours,
    //   this.duration.minutes,
    //   this.duration.seconds
    // );
    if (this.duration.days > 0) {
      return `${this.duration.days} day(s) left`;
    }
    if (this.duration.hours > 0) {
      return `${this.duration.hours} hour(s) left`;
    }
    if (this.duration.minutes > 0) {
      return `${this.duration.minutes} minute(s) left`;
    }
    if (this.duration.seconds > 0) {
      return `${this.duration.seconds} second(s) left`;
    } else {
      return;
    }

    // setGetTimer({
    //   day: days,
    //   hour: hours,
    //   min: minutes,
    //   sec: seconds,
    // });
    // if (distance < 0) {
    //   clearInterval(x);
    //   setGetTimer({
    //     day: '00',
    //     hour: '00',
    //     min: '00',
    //     sec: '00',
    //   });
    //   if (props?.startNow !== undefined) {
    //     props?.startNow(props);
    //   }
    // }
    // }, 1000);
    // console.log(this.duration);
    // });
    // return count
  }


  // async downloadExcel(name: any, data: any) {
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
  //     data
  //   )
  //   /* new format */
  //   var fmt = '0.00'
  //   /* change cell format of range B2:D4 */
  //   var range = { s: { r: 1, c: 1 }, e: { r: 2, c: 100000 } }
  //   for (var R = range.s.r; R <= range.e.r; ++R) {
  //     for (var C = range.s.c; C <= range.e.c; ++C) {
  //       var cell = ws[XLSX.utils.encode_cell({ r: R, c: C })]
  //       if (!cell || cell.t != 'n') continue // only format numeric cells
  //       cell.z = fmt
  //     }
  //   }
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new()
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  //   var fmt = '@'
  //   wb.Sheets['Sheet1']['F'] = fmt
  //   var buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })

  //   await Filesystem.requestPermissions()

  //   var fileType =
  //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  //   var blob: any = new Blob([buffer], { type: fileType })
  //   write_blob({
  //     path: `/${name}.xlsx`,
  //     directory: Directory.Documents,
  //     blob,
  //     fast_mode: true,
  //     recursive: true,
  //   }).then(async (res: any) => {
  //     console.log(res);
  //     this.presentToaster('EXCEL Downloaded Successfully');
  //   })

  // }


  // async pdfDownload(fileName: any, data: any) {

  //   const columns: any = Object.keys(data[0]); // Get the column names from the first object in the array
  //   console.log(columns)
  //   const headers = columns.map((column: any) => ({ text: column, style: 'tableHeader' })); // Generate header cells for each column
  //   console.log(headers)
  //   const rows = data.map((user: any, i: any) => {
  //     const cells = columns.map((column: any) => ({ text: user[column], style: i % 2 == 0 ? 'firstRow' : 'secondRow' })); // Generate cells for each row based on the column names
  //     return cells; // Merge cells and order cells into a single array
  //   });
  //   const newData = [headers, ...rows]
  //   console.log(newData)

  //   const docDefinition: any = {
  //     content: [
  //       { text: 'Inventory Management System', style: 'header' },
  //       {
  //         style: 'tables',
  //         table: {
  //           headerRows: 1,
  //           // widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
  //           body: [headers, ...rows],
  //         },
  //         layout: 'noBorders'
  //       },
  //     ],
  //     styles: {
  //       header: {
  //         fontSize: 18,
  //         bold: true,
  //         margin: 10,
  //         alignment: 'center'
  //       },
  //       tableHeader: {
  //         bold: true,
  //         fontSize: 10,
  //         color: 'white',
  //         alignment: 'center',
  //         fillColor: 'black'
  //       },
  //       firstRow: {
  //         fillColor: 'lightgrey',
  //         color: 'black',
  //       },
  //       secondRow: {

  //         color: 'black',
  //       }
  //     },
  //   };

  //   // pdfMake. = pdffonts.pdfMake.vfs;
  //   let pdf: any = pdfmake
  //   pdf.vfs = pdffonts.pdfMake.vfs;
  //   await Filesystem.requestPermissions()
  //   // pdfmake.createPdf(docDefinition).getBase64((base: any) => {
  //   //   console.log(base)
  //   // })
  //   // pdfmake.createPdf(docDefinition).open()
  //   pdfmake.createPdf(docDefinition).getBlob((blob: any) => {
  //     console.log('pdf======>', blob)
  //     // var blob: any = new Blob([base], { type: 'application/pdf' })
  //     write_blob({
  //       path: `/${fileName}.pdf`,
  //       directory: Directory.Documents,
  //       blob,
  //       fast_mode: true,

  //     }).then(async (res: any) => {
  //       console.log(res);
  //       this.presentToaster('PDF Downloaded Successfully');

  //     })
  //   });


  // }

}
