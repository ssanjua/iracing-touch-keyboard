use enigo::{Direction::Click, Enigo, Key, Keyboard, Settings};

#[tauri::command]
fn send_key(key: String) -> Result<(), String> {
    let mut enigo = Enigo::new(&Settings::default()).map_err(|e| e.to_string())?;
    let k = parse_key(&key).ok_or_else(|| format!("Unknown key: {}", key))?;
    enigo.key(k, Click).map_err(|e| e.to_string())?;
    Ok(())
}

fn parse_key(s: &str) -> Option<Key> {
    match s.to_uppercase().as_str() {
        "F1" => Some(Key::F1),
        "F2" => Some(Key::F2),
        "F3" => Some(Key::F3),
        "F4" => Some(Key::F4),
        "F5" => Some(Key::F5),
        "F6" => Some(Key::F6),
        "F7" => Some(Key::F7),
        "F8" => Some(Key::F8),
        "F9" => Some(Key::F9),
        "F10" => Some(Key::F10),
        "F11" => Some(Key::F11),
        "F12" => Some(Key::F12),
        "SPACE" => Some(Key::Space),
        "ENTER" => Some(Key::Return),
        "ESC" | "ESCAPE" => Some(Key::Escape),
        "TAB" => Some(Key::Tab),
        _ if s.chars().count() == 1 => s.chars().next().map(Key::Unicode),
        _ => None,
    }
}

#[cfg(target_os = "windows")]
fn configure_window_for_iracing(window: &tauri::WebviewWindow) {
    use windows::Win32::UI::WindowsAndMessaging::{
        GetWindowLongPtrW, SetWindowLongPtrW, GWL_EXSTYLE, WS_EX_NOACTIVATE,
    };

    // Look like a device, not an app window.
    let _ = window.set_decorations(false);
    let _ = window.set_always_on_top(true);
    let _ = window.set_skip_taskbar(true);

    // Critical: prevent the window from stealing focus from iRacing on touch.
    if let Ok(hwnd) = window.hwnd() {
        unsafe {
            let current = GetWindowLongPtrW(hwnd, GWL_EXSTYLE);
            SetWindowLongPtrW(
                hwnd,
                GWL_EXSTYLE,
                current | WS_EX_NOACTIVATE.0 as isize,
            );
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .invoke_handler(tauri::generate_handler![send_key])
        .setup(|_app| {
            #[cfg(target_os = "windows")]
            {
                use tauri::Manager;
                if let Some(window) = _app.get_webview_window("main") {
                    configure_window_for_iracing(&window);
                }
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
