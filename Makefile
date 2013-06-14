DEVICE=192.168.169.41 	# Change to IP of BlackBerry 10 device that is in Development mode
ZIP=RdioPlayback.zip
BAR=RdioPlayback.bar
PASSWD=password 		# Change this to be your device password
CSJPIN=123456 			# Change to your CSJ PIN created when getting signing keys
DEVICEPIN=1231D3S4		# Set to your devleopment BlackBerry Device PIN

all: compress package

compress: clean
	zip -r $(ZIP) *

clean:
	rm -fr device/ simulator/ $(ZIP)

package:
	bbwp $(ZIP) -d -o .

deploy:
	blackberry-deploy -installApp -password $(PASSWD) -device $(DEVICE) -package device/$(BAR)

signer:
	blackberry-signer -register -csjpin $(CSJPIN) -storepass $(PASSWD) /path/to/client-RDK-1234567.csj /path/to/client-PBDT-1234567.csj

request-debug-token:
	blackberry-debugtokenrequest -storepass $(PASSWD) -devicepin $(DEVICEPIN) debugtoken.bar

install-debug-token:
	blackberry-deploy -installDebugToken "/Developer/SDKs/Research In Motion/BlackBerry 10 WebWorks SDK 1.0.4.11/debugtoken.bar" \
	 -device $(DEVICE) -password $(PASSWD)