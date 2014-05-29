function(newDoc, oldDoc, userCtx) {\n\tfunction reportError(error_msg) {\n            throw({forbidden: error_msg});\n    }\n\n    // there should be a user\n    if(typeof userCtx == 'undefined') {\n            reportError(\"Not Authorized\");\n    }\n\n    // Edit : bypass all delete requests\n    if (newDoc._deleted){\n    \t return;\n    }\n\n     var docKeys = new Array('documentType', 'clientVersion', 'app', 'copyToCentralDB');\n     var documentTypes={\n         'com.leapset.beans.customer.Customer': true,\n         'com.leapset.beans.ticket.Ticket': true,\n         'frontend.model.cinco.order.Order': true,\n         'frontend.model.cinco.common.OrderQueueFilterPreference': true,\n         'com.leapset.beans.employee.TinyAuthenticatedEmployee': true,\n         'com.leapset.beans.employee.Employee': true,\n         'com.leapset.beans.employee.LoginLogout': true,\n         'com.leapset.beans.common.Settings': true,\n         'com.leapset.beans.employee.Role': true,\n         'com.leapset.beans.employee.Permissions': true,\n         'com.leapset.beans.ticket.NextReceipt': true,\n         'com.leapset.beans.printer.PrinterConfigs': true,\n         'com.leapset.beans.catalog.FullCatalog': true,\n         'com.leapset.beans.merchant.Merchant': true,\n         'com.leapset.beans.payment.PaymentThirdParties': true,\n         'com.leapset.beans.payment.CashIn': true,\n         'com.leapset.beans.payment.CashOut': true,\n         'com.leapset.beans.ticket.Batch': true,\n         'com.leapset.beans.ticket.VoidedTicketLine': true,\n         'com.leapset.beans.tiny.Devices': true,\n         'com.leapset.beans.tiny.Lock': true,\n         'com.leapset.MqMessage': true,\n         'com.leapset.beans.tiny.DocumentSubscriptions': true,\n         'com.leapset.beans.tiny.CincoUpdate': true,\n         'com.leapset.beans.tiny.DeviceUpgradeInfo': true,\n         'com.leapset.beans.tiny.MemberHistory': true,\n         'com.leapset.beans.clockinout.EmployeeShift': true,\n         'com.leapset.beans.clockinout.ClockInOutSettings': true,\n         'com.leapset.beans.tiny.EmployeePaymentHistory': true,\n         'com.leapset.beans.tiny.SchedulerStatus': true,\n         'com.leapset.beans.table.Zones': true,\n         'com.leapset.beans.common.ReceiptEmailMessage': true,\n         'com.leapset.beans.ticket.EReceiptRequest': true,\n         'com.leapset.beans.ticket.TipSharing': true,\n         'com.leapset.beans.paypal.Coupons': true,\n         'com.leapset.beans.ticket.MerchantWalletTransaction': true,\n         'com.leapset.beans.table.TableOccupied': true,\n         'com.leapset.beans.ticket.LockMenuEdits': true,\n         'frontend.model.cinco.catalog.Tracker': true,\n         'com.leapset.beans.tiny.MenuModifications': true,\n         'frontend.model.cinco.catalog.ProductOptions': true,\n         'com.leapset.beans.tiny.offlinepayment.CardProcessingStatus': true,\n         'com.leapset.beans.tiny.offlinepayment.OfflinePaymentRequest': true,\n         'com.leapset.beans.tiny.offlinepayment.PaymentStatusChangeRequest' : true,\n         'com.leapset.beans.tiny.CardPaymentDetails': true,\n         'com.leapset.beans.printer.VirtualPrinters' : true,\n 'com.leapset.beans.tiny.locale.Type' : true,\n         'com.leapset.beans.tiny.survey.FeedbackSurveyResponse' : true,\n         'com.leapset.beans.ticket.LockRewards' : true,\n         'com.leapset.beans.reward.Rewards' : true,\n         'com.leapset.beans.customer.CustomerRewardStamp' : true,\n         'com.leapset.beans.discount.DiscountReasons' : true,\n         'com.leapset.beans.ticket.ReceiptXml' : true,\n         'frontend.model.cinco.order.Order.ReceiptXML' : true\n     };\n\n     // we don't want to validate design docs here\n     if (newDoc._id.indexOf(\"_design/\") == 0){\n       return;\n     }\n\n     // validate for required fields of non design docs.\n     for( i=0; i < docKeys.length; i++ ){\n\t     if (typeof newDoc[docKeys[i]] =='undefined'){\n\t        reportError(docKeys[i] + \" is required\");\n\t     } else{\n\t        // check for valid document types\n\t        if (typeof newDoc['documentType'] != 'undefined' && typeof documentTypes[newDoc['documentType']] == 'undefined' ){\n\t          reportError(newDoc['documentType'] + \" should be a valid doc type.\");\n\t        }\n\n             //We support app=CINCO.POS only at the moment.\n             if(newDoc['app'].toUpperCase()!='CINCO.POS'){\n                 reportError(newDoc['app'] + \" is not a valid value for field 'app'. Valid values are [CINCO.POS]\");\n             }\n\t     }\n\n    }\n}\n\n    \n