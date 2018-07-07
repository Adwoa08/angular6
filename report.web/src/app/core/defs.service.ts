import { Injectable } from '@angular/core';

@Injectable()
export class Defs {
    autoPostType = {
      None: 1,
      SftpAutoPost: 2,
      IStop: 3,
      SftpManualUpload: 4, // file created by the system but submitted manually via sftp
      WebPortalUpload: 5, // file created by the system but submitted manually via web
      WebPortalReporting: 6 // file created by the system but submitted manually via web portal
  };

    // status = {
    //     'Web Reporting', StatusId: 1,
    //     'Submitted', StatusId: 2,
    //     'Accepted', StatusId: 3,
    //     'Failed', StatusId: 4,
    //     'sftp Upload', StatusId: 5,
    //     'Web Upload', StatusId: 6,
    //     'Zero Report sftp', StatusId: 7,
    //     'Zero Report Web', StatusId: 8,
    //     'Zero Report Entry', StatusId: 9,
    //     'No Submit', StatusId: 10
    // };


    status = [
        { Status: 'Web Reporting', StatusId: 1},
        { Status: 'Submitted', StatusId: 2},
        { Status: 'Accepted', StatusId: 3},
        { Status: 'Failed', StatusId: 4},
        { Status: 'sftp Upload', StatusId: 5},
        { Status: 'Web Upload', StatusId: 6},
        { Status: 'Zero Report sftp', StatusId: 7},
        { Status: 'Zero Report Web', StatusId: 8},
        { Status: 'Zero Report Entry', StatusId: 9},
        { Status: 'No Submit', StatusId: 10}
    ];

    reportingTimeZone = 'America/Denver';

    states = {
        AL: 'Alabama',
        AK: 'Alaska',
        AZ: 'Arizona',
        AR: 'Arkansas',
        CA: 'California',
        CO: 'Colorado',
        CT: 'Connecticut',
        DC: 'District of Columbia',
        DE: 'Delaware',
        FL: 'Florida',
        GA: 'Georgia',
        HI: 'Hawaii',
        ID: 'Idaho',
        IL: 'Illinois',
        IN: 'Indiana',
        IA: 'Iowa',
        KS: 'Kansas',
        KY: 'Kentucky',
        LA: 'Louisiana',
        ME: 'Maine',
        MD: 'Maryland',
        MA: 'Massachusetts',
        MI: 'Michigan',
        MN: 'Minnesota',
        MS: 'Mississippi',
        MO: 'Missouri',
        MT: 'Montana',
        NE: 'Nebraska',
        NV: 'Nevada',
        NH: 'New Hampshire',
        NJ: 'New Jersey',
        NM: 'New Mexico',
        NY: 'New York',
        NC: 'North Carolina',
        ND: 'North Dakota',
        OH: 'Ohio',
        OK: 'Oklahoma',
        OR: 'Oregon',
        PA: 'Pennsylvania',
        PR: 'Puerto Rico',
        RI: 'Rhode Island',
        SC: 'South Carolina',
        SD: 'South Dakota',
        TN: 'Tennessee',
        TX: 'Texas',
        UT: 'Utah',
        VT: 'Vermont',
        VA: 'Virginia',
        WA: 'Washington',
        WV: 'West Virginia',
        WI: 'Wisconsin',
        WY: 'Wyoming'
    };

    getStateName(abbr: string) {
        return this.states[abbr];
    }

    getNextStatus (statusId) {
        const nextStatuses = {};

        switch (statusId) {
            case this.status['Web Reporting']:
                nextStatuses['Web Reporting'] = this.status['Web Reporting'];
                nextStatuses['Submitted'] = this.status['Submitted'];
                nextStatuses['Accepted'] = this.status['Accepted'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['sftp Upload'] = this.status['sftp Upload'];
                nextStatuses['Web Upload'] = this.status['Web Upload'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['Zero Report sftp'] = this.status['Zero Report sftp'];
                nextStatuses['Zero Report Web'] = this.status['Zero Report Web'];
                nextStatuses['Zero Report Entry'] = this.status['Zero Report Entry'];
                nextStatuses['No Submit'] = this.status['No Submit'];
                break;
            case this.status['Failed']:
                nextStatuses['Web Reporting'] = this.status['Web Reporting'];
                nextStatuses['Submitted'] = this.status['Submitted'];
                nextStatuses['Accepted'] = this.status['Accepted'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['sftp Upload'] = this.status['sftp Upload'];
                nextStatuses['Web Upload'] = this.status['Web Upload'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['Zero Report sftp'] = this.status['Zero Report sftp'];
                nextStatuses['Zero Report Web'] = this.status['Zero Report Web'];
                nextStatuses['Zero Report Entry'] = this.status['Zero Report Entry'];
                nextStatuses['No Submit'] = this.status['No Submit'];
                break;
            case this.status['sftp Upload']:
                nextStatuses['Web Reporting'] = this.status['Web Reporting'];
                nextStatuses['Submitted'] = this.status['Submitted'];
                nextStatuses['Accepted'] = this.status['Accepted'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['sftp Upload'] = this.status['sftp Upload'];
                nextStatuses['Web Upload'] = this.status['Web Upload'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['Zero Report sftp'] = this.status['Zero Report sftp'];
                nextStatuses['Zero Report Web'] = this.status['Zero Report Web'];
                nextStatuses['Zero Report Entry'] = this.status['Zero Report Entry'];
                nextStatuses['No Submit'] = this.status['No Submit'];
                break;
            case this.status['Web Upload']:
                nextStatuses['Web Reporting'] = this.status['Web Reporting'];
                nextStatuses['Submitted'] = this.status['Submitted'];
                nextStatuses['Accepted'] = this.status['Accepted'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['sftp Upload'] = this.status['sftp Upload'];
                nextStatuses['Web Upload'] = this.status['Web Upload'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['Zero Report sftp'] = this.status['Zero Report sftp'];
                nextStatuses['Zero Report Web'] = this.status['Zero Report Web'];
                nextStatuses['Zero Report Entry'] = this.status['Zero Report Entry'];
                nextStatuses['No Submit'] = this.status['No Submit'];
                break;
            case this.status['Submitted']:
                nextStatuses['Web Reporting'] = this.status['Web Reporting'];
                nextStatuses['Submitted'] = this.status['Submitted'];
                nextStatuses['Accepted'] = this.status['Accepted'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['sftp Upload'] = this.status['sftp Upload'];
                nextStatuses['Web Upload'] = this.status['Web Upload'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['Zero Report sftp'] = this.status['Zero Report sftp'];
                nextStatuses['Zero Report Web'] = this.status['Zero Report Web'];
                nextStatuses['Zero Report Entry'] = this.status['Zero Report Entry'];
                nextStatuses['No Submit'] = this.status['No Submit'];
                break;
            case this.status['Accepted']:
                nextStatuses['Web Reporting'] = this.status['Web Reporting'];
                nextStatuses['Submitted'] = this.status['Submitted'];
                nextStatuses['Accepted'] = this.status['Accepted'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['sftp Upload'] = this.status['sftp Upload'];
                nextStatuses['Web Upload'] = this.status['Web Upload'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['Zero Report sftp'] = this.status['Zero Report sftp'];
                nextStatuses['Zero Report Web'] = this.status['Zero Report Web'];
                nextStatuses['Zero Report Entry'] = this.status['Zero Report Entry'];
                nextStatuses['No Submit'] = this.status['No Submit'];
                break;
            case this.status['Zero Report sftp']:
                nextStatuses['Web Reporting'] = this.status['Web Reporting'];
                nextStatuses['Submitted'] = this.status['Submitted'];
                nextStatuses['Accepted'] = this.status['Accepted'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['sftp Upload'] = this.status['sftp Upload'];
                nextStatuses['Web Upload'] = this.status['Web Upload'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['Zero Report sftp'] = this.status['Zero Report sftp'];
                nextStatuses['Zero Report Web'] = this.status['Zero Report Web'];
                nextStatuses['Zero Report Entry'] = this.status['Zero Report Entry'];
                nextStatuses['No Submit'] = this.status['No Submit'];
                break;
            case this.status['Zero Report Web']:
                nextStatuses['Web Reporting'] = this.status['Web Reporting'];
                nextStatuses['Submitted'] = this.status['Submitted'];
                nextStatuses['Accepted'] = this.status['Accepted'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['sftp Upload'] = this.status['sftp Upload'];
                nextStatuses['Web Upload'] = this.status['Web Upload'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['Zero Report sftp'] = this.status['Zero Report sftp'];
                nextStatuses['Zero Report Web'] = this.status['Zero Report Web'];
                nextStatuses['Zero Report Entry'] = this.status['Zero Report Entry'];
                nextStatuses['No Submit'] = this.status['No Submit'];
                break;
            case this.status['Zero Report Entry']:
                nextStatuses['Web Reporting'] = this.status['Web Reporting'];
                nextStatuses['Submitted'] = this.status['Submitted'];
                nextStatuses['Accepted'] = this.status['Accepted'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['sftp Upload'] = this.status['sftp Upload'];
                nextStatuses['Web Upload'] = this.status['Web Upload'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['Zero Report sftp'] = this.status['Zero Report sftp'];
                nextStatuses['Zero Report Web'] = this.status['Zero Report Web'];
                nextStatuses['Zero Report Entry'] = this.status['Zero Report Entry'];
                nextStatuses['No Submit'] = this.status['No Submit'];
                break;
            case this.status['No Submit']:
                nextStatuses['Web Reporting'] = this.status['Web Reporting'];
                nextStatuses['Submitted'] = this.status['Submitted'];
                nextStatuses['Accepted'] = this.status['Accepted'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['sftp Upload'] = this.status['sftp Upload'];
                nextStatuses['Web Upload'] = this.status['Web Upload'];
                nextStatuses['Failed'] = this.status['Failed'];
                nextStatuses['Zero Report sftp'] = this.status['Zero Report sftp'];
                nextStatuses['Zero Report Web'] = this.status['Zero Report Web'];
                nextStatuses['Zero Report Entry'] = this.status['Zero Report Entry'];
                nextStatuses['No Submit'] = this.status['No Submit'];
                break;
        }

        return nextStatuses;
    }



}
