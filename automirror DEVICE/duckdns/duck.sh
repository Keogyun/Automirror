
internal_ip=$(/usr/sbin/ifconfig wlan0 | awk '/inet / {print $2}')


if [ -n "$internal_ip" ]; then
  echo url="https://www.duckdns.org/update?domains=automirror00001&token=562da377-e8bf-4867-b6d4-f9d3ef9029cd&ip=$internal_ip" | curl -k -o ~/automirror_project/duckdns/duck.log -K -
fi
