<?php

function jzzf_ctrl_email() {
    if(!($form = $_REQUEST['_form'])) {
        jzzf_http_error(403, "Invalid form");
    }
    if(!($email = jzzf_get_email($form))) {
        jzzf_http_error(404, "Form Not Found");
    }
    $replaced = jzzf_apply_email_templates($email);
    jzzf_send_email($replaced);
}

function jzzf_apply_email_templates($email) {
    if(jzzf_log_enabled()) {
        jzzf_debug("Received email placeholders:" . json_encode($_REQUEST));
    }
    $names = array('to', 'from', 'cc', 'bcc', 'subject', 'message');
    $replaced = array();
    foreach($names as $name) {
        $chunks = jzzf_parse_template($email->$name);
        $replaced[$name] = jzzf_apply_template($chunks, $_REQUEST, $name);
    }
    return $replaced;
}

function jzzf_http_error($code, $msg) {
    $response = "HTTP/1.0 $code $msg";
    jzzf_error("Http error: $response");
    header($response);
    exit;
}
