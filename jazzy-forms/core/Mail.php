<?php

function jzzf_send_email($email) {
    $message = $email["message"] . "\r\n\r\n";
    $headers = 'From: '. $email["from"] . "\r\n";
    if($email['cc']) {
        $headers .= 'Cc: '. $email["cc"] . "\r\n";
    }
    if($email['bcc']) {
        $headers .= 'Bcc: '. $email["bcc"] . "\r\n";
    }
    $header .= "Content-type: text/plain; charset=utf-8";
    if(jzzf_log_enabled()) {
        jzzf_debug("Email headers: $headers");
        jzzf_debug("Email to: {$email['to']}");
        jzzf_debug("Email subject: {$email['subject']}");
        jzzf_debug("Email message: {$email['message']}");
    }
    if(get_option('jzzf_tweak_suppress_email', false)) {
        jzzf_info('Emails are suppressed. Not sending.');
        return true;
    } else {
        jzzf_info('Sending email');
        return wp_mail($email["to"], $email["subject"], $message, $headers);
    }
}
